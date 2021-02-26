using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebApplicationRiderTest.EF;
using WebApplicationRiderTest.EF.Entities;
using WebApplicationRiderTest.Interfaces;

namespace WebApplicationRiderTest.Services
{
    public class JWTService : IJWTService
    {
        private readonly EFContext _context;
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        public JWTService(EFContext context,
            IConfiguration configuration,
            UserManager<User> userManager)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
        }

        public string CreateToken(User user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            var claims = new List<Claim>()
            {
                new Claim("id", user.Id.ToString()),
                new Claim("email", user.Email)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            string jwtTokenSecretKey = this._configuration.GetValue<string>("SecretPhrase");

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtTokenSecretKey));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(
                signingCredentials: signingCredentials,
                claims: claims,
                expires: DateTime.Now.AddYears(1));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}