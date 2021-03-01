using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationRiderTest.DTO.Actor;
using WebApplicationRiderTest.DTO.Filters;
using WebApplicationRiderTest.DTO.Movie;
using WebApplicationRiderTest.DTO.Photo;
using WebApplicationRiderTest.DTO.Result;
using WebApplicationRiderTest.EF;
using WebApplicationRiderTest.EF.Entities;

namespace WebApplicationRiderTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;

        public ActorController(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        //CRUD
        /// <summary>
        /// This POST method adds Actor model to database
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ResultDTO> AddActor([FromBody]ActorAddDTO model)
        {
            try
            {
                var actor = _mapper.Map<ActorAddDTO, Actor>(model);
                await _context.actors.AddAsync(actor);
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

        /// <summary>
        /// This GET method gets Actor model from database by it`s ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActorDTO> GetActor([FromRoute] int id)
        {
            var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == id);
            return _mapper.Map<Actor, ActorDTO>(actor);
        }
        
        /// <summary>
        /// This GET method gets all Actor models from database
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<ActorDTO>> GetActors()
        {
            var actors = await _context.actors.ToListAsync();
            return _mapper.Map<List<Actor>, List<ActorDTO>>(actors);
        }
        
        /// <summary>
        /// This POST method edits Actor model by it`s ID
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("edit")]
        public async Task<ResultDTO> EditActor([FromBody]ActorDTO model)
        {
            var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == model.Id);
            _mapper.Map(model, actor);
            await _context.SaveChangesAsync();
            return new ResultDTO
            {
                Status = 200,
                Message = "Edited"
            };
        }
        
        /// <summary>
        /// This DELETE method deletes Actor model by it`s ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ResultDTO> DeleteActor([FromRoute] int id)
        {
            var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == id);
            _context.actors.Remove(actor);
            await _context.SaveChangesAsync();
            return new ResultDTO
            {
                Status = 200,
                Message = "Deleted"
            };
        }
        
        /// <summary>
        /// This GET method return list of unique column data from SQL table 
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet("filter/{filter}")]
        public async Task<IEnumerable<string>> GetFilterList([FromRoute]string filter)
        {
            switch (filter.ToLower())
            {
                case "country":
                    var filters1 = await _context.actors.Select(t => t.Country).Distinct().ToListAsync();
                    return filters1.ConvertAll<string>(input => input.ToString());
                    break;
                default:
                    return null;
            }
        }

        [HttpPost("filter/data")]
        public async Task<IEnumerable<ActorDTO>> GetActorsByFilterData([FromBody]ActorFilter model)
        {
            var actors = await _context.actors.ToListAsync();
            switch (model.Filter)
            {
                case "country":
                    var result = actors.Where(t => model.Data.Any(s => s == t.Country)).ToList();
                    return _mapper.Map<List<Actor>, List<ActorDTO>>(actors);
                default:
                    return null;
            }
        }
        
        /// <summary>
        /// This GET method return Actor`s movies by it`s ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("movies/{id}")]
        public async Task<IEnumerable<MovieDTO>> GetActorMovies([FromRoute] int id)
        {
            var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == id);
            var movies = actor.Movies.ToList();
            return _mapper.Map<List<Movie>, List<MovieDTO>>(movies);
        }

        [HttpGet("photos/{id}")]
        public async Task<IEnumerable<PhotoDTO>> GetActorPhotos([FromRoute] int id)
        {
            var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == id);
            var photos = actor.Photos.ToList();
            return _mapper.Map<List<Photo>, List<PhotoDTO>>(photos);
        }
        
        [HttpPost("photos/{id}")]
        public async Task<ResultDTO> AddActorPhoto([FromRoute] int id, [FromBody] PhotoDTO model)
        {
            try
            {
                var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == id);
                var photo = _mapper.Map<PhotoDTO, Photo>(model);
                actor.Photos.Add(photo);
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

        [HttpDelete("photos/{id}/{photoId}")]
        public async Task<ResultDTO> DeleteActorPhoto([FromRoute] int id, [FromRoute] int photoId)
        {
            var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == id);
            var photo = await _context.photos.SingleOrDefaultAsync(t => t.Id == photoId);
            actor.Photos.Remove(photo);
            await _context.SaveChangesAsync();

            return new ResultDTO
            {
                Status = 200,
                Message = "Deleted"
            };
        }
        
        [HttpPost("{id}/{movieid}")]
        public async Task<ResultDTO> AddActorMovie([FromRoute] int id, [FromRoute] int movieid)
        {
            try
            {
                var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == id);
                var movie = await _context.movies.SingleOrDefaultAsync(t => t.Id == movieid);
                actor.Movies.Add(movie);
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
    }
}