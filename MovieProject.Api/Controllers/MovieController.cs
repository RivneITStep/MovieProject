using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MovieProject.DAL;
using MovieProject.DAL.Entities;
using MovieProject.DTO.Models;
using MovieProject.DTO.Models.Filters;
using MovieProject.DTO.Models.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;

        public MovieController(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        //CRUD
        /// <summary>
        /// This POST method adds Movie model to database
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ResultDTO> AddMovie([FromBody] MovieDTO model)
        {
            var movie = _mapper.Map<MovieDTO,Movie>(model);
            await _context.movies.AddAsync(movie);
            await _context.SaveChangesAsync();
            try
            {
                
                return new ResultDTO
                {
                    Status = 200,
                    Message = "Posted"
                };
            }
            catch (Exception ex)
            {
                var temp = new List<string>();
                temp.Add(ex.Message);
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = temp
                };
            }
        }
        
        /// <summary>
        /// This GET method returns Movie model from database by it`s ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<MovieDTO> GetMovie([FromRoute] int id)
        {
            var movie = await _context.movies.SingleOrDefaultAsync(t => t.Id == id);
            return _mapper.Map<Movie, MovieDTO>(movie);
        }
        
        /// <summary>
        /// This GET method returns all Movie models from database
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<MovieDTO>> GetMovies()
        {
            var movies = await _context.movies.ToListAsync();
            return _mapper.Map<List<Movie>, List<MovieDTO>>(movies);
        }
        
        /// <summary>
        /// This POST method edits Movie model by it`s ID
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("edit")]
        public async Task<ResultDTO> EditMovie([FromBody] MovieDTO model)
        {
            var movie = await _context.movies.SingleOrDefaultAsync(t => t.Id == model.Id);
            _mapper.Map(model, movie);
            await _context.SaveChangesAsync();
            return new ResultDTO
            {
                Status = 200,
                Message = "Edited"
            };
        }
        
        /// <summary>
        /// This DELETE method deletes Movie model from database by it`s ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ResultDTO> DeleteMovie([FromRoute] int id)
        {
            var movie = await _context.movies.SingleOrDefaultAsync(t => t.Id == id);
            _context.movies.Remove(movie);
            await _context.SaveChangesAsync();
            return new ResultDTO
            {
                Status = 200,
                Message = "Deleted"
            };
        }
    }
}
