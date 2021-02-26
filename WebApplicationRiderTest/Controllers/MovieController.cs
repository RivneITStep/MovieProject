using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationRiderTest.DTO.Actor;
using WebApplicationRiderTest.DTO.Movie;
using WebApplicationRiderTest.DTO.Result;
using WebApplicationRiderTest.DTO.Video;
using WebApplicationRiderTest.EF;
using WebApplicationRiderTest.EF.Entities;

namespace WebApplicationRiderTest.Controllers
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
        public async Task<ResultDTO> AddMovie([FromBody] MovieAddDTO model)
        {
            var movie = _mapper.Map<MovieAddDTO,Movie>(model);
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
            var movie = await _context.movies
                .SingleOrDefaultAsync(t => t.Id == id);
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
            var movie = await _context.movies
                .SingleOrDefaultAsync(t => t.Id == model.Id);
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
            var movie = await _context.movies
                .SingleOrDefaultAsync(t => t.Id == id);
            _context.movies.Remove(movie);
            await _context.SaveChangesAsync();
            return new ResultDTO
            {
                Status = 200,
                Message = "Deleted"
            };
        }
        
        /// <summary>
        /// This GET method returns unique column data from Movie database table
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet("filter/{filter}")]
        public async Task<IEnumerable<string>> GetFilterList(string filter)
        {
            switch (filter.ToLower())
            {
                case "country":
                    var filters1 = await _context.movies
                        .Select(t => t.Country)
                        .Distinct()
                        .ToListAsync();
                    return filters1;
                case "genre":
                    var filters2 = await _context.movies
                        .Select(t => t.Genre)
                        .Distinct()
                        .ToListAsync();
                    return filters2;
                case "year":
                    var filters3 = await _context.movies
                        .Select(t => t.Year)
                        .Distinct()
                        .ToListAsync();
                    return filters3.ConvertAll<string>(input => input.ToString());
                default:
                    return null;
            }
        }
        
        /// <summary>
        /// This GET method returns Movie`s actors by it`s ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("actors/{id}")]
        public async Task<IEnumerable<ActorDTO>> GetMovieActors([FromRoute] int id)
        {
            var movie = await _context.movies
                .SingleOrDefaultAsync(t => t.Id == id);
            var actors = movie.Actors.ToList();
            return _mapper.Map<List<Actor>, List<ActorDTO>>(actors);
        }

        [HttpPost("{id}/{actorid}")]
        public async Task<ResultDTO> AddMovieActor([FromRoute] int id, [FromRoute] int actorid)
        {
            try
            {
                var movie = await _context.movies
                    .SingleOrDefaultAsync(t => t.Id == id);
                var actor = await _context.actors
                    .SingleOrDefaultAsync(t => t.Id == actorid);
                movie.Actors.Add(actor);
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
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = temp
                };
            }
        }

        [HttpDelete("{id}/{actorid}")]
        public async Task<ResultDTO> DeleteMovieActor([FromRoute] int id, [FromRoute] int actorid)
        {
            var movie = await _context.movies.SingleOrDefaultAsync(t => t.Id == id);
            var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == actorid);
            movie.Actors.Remove(actor);
            await _context.SaveChangesAsync();
            
            return new ResultDTO
            {
                Status = 200,
                Message = "Deleted"
            };
        }
        

        [HttpPost("rate/{id}/{mark}")]
        public async Task<ResultDTO> RateMovieById([FromRoute] int id, [FromRoute] int mark)
        {
            var movie = await _context.movies
                .SingleOrDefaultAsync(t => t.Id == id);
            if (movie.Rating == 0)
            {
                movie.Rating = mark;
            }
            else
            {
                movie.Rating += mark;
                movie.Rating /= 2;
            }

            await _context.SaveChangesAsync();
            
            return new ResultDTO
            {
                Status = 200,
                Message = "Edited"
            };
        }

        [HttpPost("{id}/video")]
        public async Task<ResultDTO> AddVideoToMovie([FromBody] VideoDTO model, [FromRoute] int id)
        {
            try
            {
                var movie = await _context.movies
                    .SingleOrDefaultAsync(t => t.Id == id);
                movie.Video = _mapper.Map<VideoDTO, Video>(model);
                await _context.SaveChangesAsync();

                return new ResultDTO
                {
                    Status = 200,
                    Message = "Posted"
                };
            }
            catch (Exception ex)
            {
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = ex.Message
                };
            }
        }

        [HttpGet("{id}/video")]
        public async Task<VideoDTO> GetMovieVideo([FromRoute] int id)
        {
            var movie = await _context.movies
                .Include(t => t.Video)
                .SingleOrDefaultAsync(t => t.Id == id);
            return _mapper.Map<Video, VideoDTO>(movie.Video);
        }

        [HttpGet("{id}/actors/available")]
        public async Task<IEnumerable<ActorDTO>> GetAvailableActors([FromRoute] int id)
        {
            var movie = await _context.movies
                .Include(t => t.Actors)
                .SingleOrDefaultAsync(t => t.Id == id);
            var actors = await _context.actors
                .ToListAsync();
            var result = actors.Except(movie.Actors).ToList();
            return _mapper.Map<List<Actor>, List<ActorDTO>>(result);
        }
    }
}