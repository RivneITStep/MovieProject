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
        private readonly ILogger<MovieController> _logger;

        public MovieController(EFContext context, IMapper mapper, ILogger<MovieController> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<MovieDTO> getMovie([FromRoute]int id)
        {
            var obj = await _context.movies.SingleOrDefaultAsync(t => t.Id == id);
            return _mapper.Map<Movie, MovieDTO>(obj);
        }

        [HttpGet]
        public async Task<List<MovieDTO>> getMovies()
        {
            var entities = await _context.movies.ToListAsync();
            return _mapper.Map<List<Movie>, List<MovieDTO>>(entities);
        }

        [HttpGet("search/{search}")]
        public async Task<IEnumerable<MovieDTO>> searchMovieByName([FromRoute]string search)
        {
            search = search.ToLower();
            var entities = await _context.movies.ToListAsync();
            if (!String.IsNullOrEmpty(search))
            {
                entities = entities.Where(s => s.Name.ToLower().Contains(search) || s.OriginalName.ToLower().Contains(search)).ToList();
            }
            return _mapper.Map<List<Movie>, List<MovieDTO>>(entities);
        }

        [HttpGet("filters")]
        public async Task<IEnumerable<MovieDTO>> getMoviesByFilter([FromBody]MovieFilter filter)
        {
            var entities = await _context.movies.ToListAsync();
            if (!String.IsNullOrEmpty(filter.Country))
            {
                entities = entities.Where(s => s.Country.ToLower().Contains(filter.Country.ToLower())).ToList();
            }

            if (!String.IsNullOrEmpty(filter.Genre))
            {
                entities = entities.Where(s => s.Genre.ToLower().Contains(filter.Genre.ToLower())).ToList();
            }

            if(filter.Year != 0)
            {
                entities = entities.Where(s => s.Year.Equals(filter.Year)).ToList();
            }

            if(filter.Rating != 0)
            {
                entities = entities.Where(s => s.Rating > filter.Rating).ToList();
            }

            return _mapper.Map<List<Movie>, List<MovieDTO>>(entities);
        }

        [HttpPost]
        public async Task<ResultDTO> addMovie([FromBody] MovieDTO model)
        {
            try
            {
                var obj = _mapper.Map<MovieDTO, Movie>(model);
                await _context.movies.AddAsync(obj);
                _logger.LogInformation($"Movie added: id: {obj.Id} name: {obj.Name}");
                await _context.SaveChangesAsync();

                return new ResultDTO
                {
                    Status = 200,
                    Message = "Posted"
                };
            }
            catch (Exception ex)
            {
                List<string> temp = new List<string>();
                temp.Add(ex.Message);
                _logger.LogInformation($"Movie not added: {ex.Message}");
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = temp
                };
            }
        }

        [HttpPost("edit")]
        public async Task<ResultDTO> editMovie([FromBody]MovieDTO model)
        {
            var obj = await _context.movies.SingleOrDefaultAsync(t => t.Id == model.Id);

            obj.Name = model.Name;
            obj.OriginalName = model.OriginalName;
            obj.Year = model.Year;
            obj.Description = model.Description;
            obj.Country = model.Country;
            obj.Director = model.Director;
            obj.Operator = model.Operator;
            obj.Composer = model.Composer;
            obj.Genre = model.Genre;
            obj.Slogan = model.Slogan;
            obj.Budget = model.Budget;
            obj.Length = model.Length;
            obj.CountViews = model.CountViews;
            obj.PictureUrl = model.PictureUrl;
            obj.TrailerUrl = model.TrailerUrl;

            await _context.SaveChangesAsync();

            return new ResultDTO
            {
                Status = 200,
                Message = "Edited"
            };
        }

        [HttpPost("{id}/add/actor")]
        public async Task<ResultDTO> addMovieActor([FromBody]ActorDTO model, [FromRoute]int id)
        {
            try
            {
                var movie = await _context.movies.SingleOrDefaultAsync(t => t.Id == id);
                var obj = _mapper.Map<ActorDTO, Actor>(model);
                _logger.LogInformation($"Actor added to movie: id: {obj.Id} name: {obj.Name}");
                await _context.SaveChangesAsync();

                return new ResultDTO
                {
                    Status = 200,
                    Message = "Posted"
                };
            }
            catch (Exception ex)
            {
                List<string> temp = new List<string>();
                temp.Add(ex.Message);
                _logger.LogInformation($"Actor not added to movie: {ex.Message}");
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = temp
                };
            }
        }
        
        [HttpDelete("{id}")]
        public async Task<ResultDTO> deleteMovie([FromRoute]int id)
        {
            try
            {
                var obj = await _context.movies.SingleOrDefaultAsync(t => t.Id == id);
                _context.movies.Remove(obj);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Movie: id: {obj.Id} deleted");
                return new ResultDTO
                {
                    Status = 200,
                    Message = "Posted"
                };
            }
            catch (Exception ex)
            {
                List<string> temp = new List<string>();
                temp.Add(ex.Message);
                _logger.LogInformation($"Movie not deleted: {ex.Message}");
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = temp
                };
            }
        }

        [HttpPost("{id}/actor/{actorid}")]
        public ResultDTO addFilmActor([FromRoute]int id,[FromRoute]int actorid)
        {
            try
            {
                var movie = _context.movies.FirstOrDefault(t => t.Id == id); 
                var actor = _context.actors.FirstOrDefault(t => t.Id == actorid);
                movie.Actors.Add(actor);
                _context.SaveChanges();

                return new ResultDTO
                {
                    Status = 200,
                    Message = "Posted"
                };
            }
            catch (Exception ex)
            {
                List<string> temp = new List<string>();
                temp.Add(ex.Message);
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = temp
                };
            }
        }

        [HttpGet("{id}/actors")]
        public IEnumerable<ActorDTO> getFilmActors([FromRoute]int id)
        {
            var actors = _context.movies.Include(t => t.Actors).ThenInclude(t => t.Movies).SingleOrDefault(t => t.Id == id).Actors;
            return _mapper.Map<List<Actor>, List<ActorDTO>>(actors);
        }
    }
}
