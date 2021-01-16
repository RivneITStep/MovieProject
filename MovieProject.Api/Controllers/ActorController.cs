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
    public class ActorController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<ActorController> _logger;

        public ActorController(EFContext context, IMapper mapper, ILogger<ActorController> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ResultDTO> addActor([FromBody] ActorDTO model)
        {
            try
            {
                var obj = _mapper.Map<ActorDTO, Actor>(model);
                _logger.LogInformation($"Actor added: id: {obj.Id} name: {obj.Name}");
                await _context.actors.AddAsync(obj);
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
                _logger.LogInformation($"Actor not added: {ex.Message}");
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = temp
                };
            }
        }

        [HttpPost("edit/")]
        public async Task<ResultDTO> editActor([FromBody]ActorDTO model)
        {
            var obj = await _context.actors.SingleOrDefaultAsync(t => t.Id == model.Id);

            obj.Name = model.Name;
            obj.Surname = model.Surname;
            obj.Age = model.Age;
            obj.Description = model.Description;
            obj.CountFilms = model.CountFilms;
            obj.BirthYear = model.BirthYear;
            obj.Country = model.Country;
            obj.PictureUrl = model.PictureUrl;

            await _context.SaveChangesAsync();
            return new ResultDTO
            {
                Message = "Edited",
                Status = 200
            };
        }


        [HttpGet("{id}")]
        public async Task<ActorDTO> getActor([FromRoute] int id)
        {
            var obj = await _context.actors.SingleOrDefaultAsync(t => t.Id == id);
            return _mapper.Map<Actor, ActorDTO>(obj);
        }

        [HttpGet]
        public async Task<IEnumerable<ActorDTO>> getActors()
        {
            var entities = await _context.actors.ToListAsync();
            return _mapper.Map<List<Actor>, List<ActorDTO>>(entities);
        }

        [HttpGet("filters")]
        public async Task<IEnumerable<ActorDTO>> searchActorByFilters([FromBody]ActorFilter filter)
        {
            var entities = await _context.actors.ToListAsync();
            if (!String.IsNullOrEmpty(filter.Country))
            {
                entities = entities.Where(s => s.Country.ToLower().Contains(filter.Country.ToLower())).ToList();
            }

            if (filter.BirthYear != 0)
            {
                entities = entities.Where(s => s.BirthYear.Equals(filter.BirthYear)).ToList();
            }

            if (filter.CountFilms != 0)
            {
                entities = entities.Where(s => s.CountFilms.Equals(filter.CountFilms)).ToList();
            }

            return _mapper.Map<List<Actor>, List<ActorDTO>>(entities);
        }

        [HttpPost("{id}/add/movie/{movieid}")]
        public async Task<ResultDTO> addActorFilm([FromRoute]int id, [FromRoute]int movieid)
        {
            try
            {
                var movie = await _context.movies.SingleOrDefaultAsync(t => t.Id == movieid);
                var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == id);
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
                _logger.LogInformation($"Movie not added to actor: {ex.Message}");
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = temp
                };
            }
        }

        [HttpGet("search/{search}")]
        public async Task<IEnumerable<ActorDTO>> searchActorByName([FromRoute]string search)
        {
            search = search.ToLower();
            var entities = await _context.actors.ToListAsync();
            if (!String.IsNullOrEmpty(search))
            {
                entities = entities.Where(s => s.Name.ToLower().Contains(search) || s.Surname.ToLower().Contains(search)).ToList();
            }
            return _mapper.Map<List<Actor>, List<ActorDTO>>(entities);
        }
        [HttpDelete("{id}")]
        public async Task<ResultDTO> deleteActor([FromRoute]int id)
        {
            try
            {
                var obj = await _context.actors.SingleOrDefaultAsync(t => t.Id == id);
                _context.actors.Remove(obj);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Actor: id: {obj.Id} deleted");
                return new ResultDTO
                {
                    Status = 200,
                    Message = "Posted"
                };
            }
            catch(Exception ex)
            {
                List<string> temp = new List<string>();
                temp.Add(ex.Message);
                _logger.LogInformation($"Actor not deleted: {ex.Message}");
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = temp
                };
            }
        }

        [HttpGet("{id}/movies")]
        public IEnumerable<MovieDTO> getActorFilms([FromRoute] int id)
        {
            var actors = _context.actors.Include(t => t.Movies).ThenInclude(t => t.Actors).SingleOrDefault(t => t.Id == id).Movies;
            return _mapper.Map<List<Movie>, List<MovieDTO>>(actors);
        }

        [HttpGet("{id}/photos")]
        public async Task<IEnumerable<PhotoDTO>> getActorPhotos([FromRoute]int id)
        {
            var actor = await _context.actors.Include(t => t.Photos).SingleOrDefaultAsync(t => t.Id == id);
            var photos = actor.Photos.ToList();
            return _mapper.Map<List<Photo>, List<PhotoDTO>>(photos);
            
        }
        

    }
}
