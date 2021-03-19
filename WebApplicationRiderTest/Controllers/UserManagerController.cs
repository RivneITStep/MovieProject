using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationRiderTest.DTO.Movie;
using WebApplicationRiderTest.DTO.Password;
using WebApplicationRiderTest.DTO.Result;
using WebApplicationRiderTest.DTO.User;
using WebApplicationRiderTest.EF;
using WebApplicationRiderTest.EF.Entities;

namespace WebApplicationRiderTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagerController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private IHostingEnvironment _env;

        public UserManagerController(EFContext context, UserManager<User> userManager, IMapper mapper, IHostingEnvironment env)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
            _env = env;
        }

        /// <summary>
        /// This GET method returns all Users from database
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<UserDTO>> GetUsers()
        {
            var users = await _context.Users
                .ToListAsync();
            return _mapper.Map<List<User>, List<UserDTO>>(users);
        }


        //localhost:12312/api/UserManager/RemoveUser/89as7d89a7a8d09a8sd
        /// <summary>
        /// This POST method removes User from database by it`s ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("RemoveUser/{id}")]
        public async Task<ResultDTO> RemoveUser([FromRoute] string id)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(t => t.Id == id);
                _context.Users.Remove(user);
                return new ResultDTO
                {
                    Status = 200,
                    Message = "OK"
                };
            }
            catch (Exception e)
            {
                List<string> temp = new List<string>();
                temp.Add(e.Message);
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "ERROR",
                    Errors = temp
                };
            }
        }

        //localhost:12312/api/UserManager/98d789a789asd7a98sd
        /// <summary>
        /// This GET method returns User from database by it`s ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<UserDTO> GetUser([FromRoute] string id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(t => t.Id == id);
            return _mapper.Map<User, UserDTO>(user);
        }

        [HttpPost("{id}/movies/{movieid}")]
        public async Task<ResultDTO> AddUserFavouriteMovie([FromRoute] string id, [FromRoute] int movieid)
        {
            var user = await _context.Users.Include(t => t.Movies).SingleOrDefaultAsync(t => t.Id == id);
            var movie = await _context.movies.SingleOrDefaultAsync(t => t.Id == movieid);
            user.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return new ResultDTO
            {
                Status = 200,
                Message = "Posted"
            };
        }

        [HttpGet("{id}/movies")]
        public async Task<IEnumerable<MovieDTO>> GetUserFavouriteMovies([FromRoute] string id)
        {
            var user = await _context.Users
                .Include(t => t.Movies)
                .SingleOrDefaultAsync(t => t.Id == id);
            var movies = user.Movies.ToList();
            return _mapper.Map<List<Movie>, List<MovieDTO>>(movies);

        }

        [HttpDelete("{id}/movies/{movieid}")]
        public async Task<ResultDTO> DeleteUserFavouriteMovie([FromRoute] string id, [FromRoute] int movieid)
        {
            var user = await _context.Users
                .Include(t => t.Movies)
                .SingleOrDefaultAsync(t => t.Id == id);
            var movie = await _context.movies
                .SingleOrDefaultAsync(t => t.Id == movieid);
            user.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            return new ResultDTO
            {
                Status = 200,
                Message = "Deleted"
            };

        }
    
        /// <summary>
        /// This POST method edits User by it`s ID
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("editUser/{id}")]
        public async Task<ResultDTO> EditUser([FromRoute] string id, [FromBody] UserEditDTO model)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(t => t.Id == id);
            _mapper.Map(model, user);
            await _context.SaveChangesAsync();
            return new ResultDTO
            {
                Status = 200,
                Message = "Edited"
            };
        }

        [HttpGet("user/image/{id}")]
        public async Task<string> GetUserImage([FromRoute]string id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(t => t.Id == id);
            string filepath = _env.WebRootPath + @"\Images\" + user.PictureUrl;
            var file = Image.FromFile(filepath);
            using (MemoryStream m = new MemoryStream())
            {
                file.Save(m, file.RawFormat);
                byte[] imageBytes = m.ToArray();

                // Convert byte[] to Base64 String
                string base64String = Convert.ToBase64String(imageBytes);
                return base64String;
            }
        }
        
        [HttpPost("upload/image/{id}"), DisableRequestSizeLimit]
        public async Task<ResultDTO> Upload(string id)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(t => t.Id == id);
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("wwwroot", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    var ext = Path.GetExtension(fileName);
                    var newFileName = Guid.NewGuid().ToString() + ext;
                    if (user.PictureUrl != null)
                    {
                        var pathToDelete = Path.Combine(pathToSave, user.PictureUrl);
                        if (System.IO.File.Exists(pathToDelete))
                        { 
                            System.IO.File.Delete(pathToDelete);
                        } 
                    }
                    
                    user.PictureUrl = newFileName;
                    var fullPath = Path.Combine(pathToSave, newFileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    await _context.SaveChangesAsync();
                    
                    return new ResultDTO
                    {
                        Status = 200,
                        Message = "Posted"
                    };
                }
                else
                {
                    return new ResultDTO
                    {
                        Status = 500,
                        Message = "Not found"
                    };
                }
            }
            catch (Exception ex)
            {
                return new ResultDTO
                {
                    Status = 500,
                    Message = ex.Message
                };
            }
        }

        [HttpGet("marks/{id}")]
        public async Task<IEnumerable<MarkDTO>> GetUserMarks([FromRoute] string id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(t => t.Id == id);
            var entities = user.Marks.ToList();

            return _mapper.Map<List<Mark>, List<MarkDTO>>(entities);
        }

        [HttpDelete("marks/{markid}")]
        public async Task<ResultDTO> DeleteMovie([FromRoute] int markid)
        {
            var mark = await _context.marks.SingleOrDefaultAsync(t => t.Id == markid);
            _context.marks.Remove(mark);

            await _context.SaveChangesAsync();
            return new ResultDTO
            {
                Status = 200,
                Message = "Deleted"
            };
        }
    }
}