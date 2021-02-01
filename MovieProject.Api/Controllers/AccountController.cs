using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MovieProject.Api.Helper;
using MovieProject.Auth.Interfaces;
using MovieProject.DAL;
using MovieProject.DAL.Entities;
using MovieProject.DTO.Models;
using MovieProject.DTO.Models.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.Api.Controllers
{
    /// <summary>
    /// Account Controller is responsible for Users Authorization
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AccountController> _logger;
        private readonly IJWTService _jwtTokenService;

        public AccountController(
            EFContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            ILogger<AccountController> logger,
            IJWTService jWtTokenService)
        {
            _userManager = userManager;
            _context = context;
            _configuration = configuration;
            _signInManager = signInManager;
            _logger = logger;
            _jwtTokenService = jWtTokenService;
        }

        /// <summary>
        /// This POST method is used to Register
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("register")]
        public async Task<ResultDTO> Register([FromBody]UserRegisterDTO model)
        {
            if (!ModelState.IsValid)
            {
                return new ResultErrorDTO
                {
                    Status = 500,
                    Errors = CustomValidator.GetErrorsByModel(ModelState)
                };
            }

            var user = new User()
            {
                UserName = model.Email,
                Email = model.Email,
                Balance = 0
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                _logger.LogInformation($"User: email: {user.Email} register failed");
                return new ResultErrorDTO
                {
                    Status = 500,
                    Errors = CustomValidator.GetErrorsByIdentityResult(result)
                };
            }
            else
            {
                _logger.LogInformation($"User registered: id: {user.Id} email: {user.Email}");
                result = _userManager.AddToRoleAsync(user, "User").Result;
                await _context.SaveChangesAsync();
            }

            return new ResultDTO
            {
                Status = 200
            };
        }


        /// <summary>
        /// This POST method is used to Login
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("login")]
        public async Task<ResultDTO> Login([FromBody]UserLoginDTO model)
        {
            if (!ModelState.IsValid)
            {
                return new ResultErrorDTO
                {
                    Status = 400,
                    Message = "ERROR",
                    Errors = CustomValidator.GetErrorsByModel(ModelState)
                };
            }
            else
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
                if (!result.Succeeded)
                {
                    _logger.LogInformation($"User: email: {model.Email} login failed");
                    List<string> error = new List<string>();
                    error.Add("User is not found, password or email isn't correct!");
                    return new ResultErrorDTO
                    {
                        Status = 400,
                        Message = "user not found!",
                        Errors = error
                    };
                }
                else
                {
                    var user = await _userManager.FindByEmailAsync(model.Email);
                    await _signInManager.SignInAsync(user, false);
                    _logger.LogInformation($"User: email: {model.Email} login success");
                    return new ResultLoginDTO
                    {
                        Status = 200,
                        Message = "OK",
                        Token = _jwtTokenService.CreateToken(user)
                    };

                }
            }
        }
    }
}
