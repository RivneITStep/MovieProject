using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        public async Task<ResultDTO> addActor([FromBody]ActorDTO model)
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
            catch(Exception ex)
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

        [HttpGet("{id}")]
        public async Task<ActorDTO> getActor([FromRoute]int id)
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

        [HttpPost("{id}/add/movie")]
        public async Task<ResultDTO> addActorFilm([FromBody]MovieDTO model, [FromRoute]int id)
        {
            try
            {
                var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == id);
                var obj = _mapper.Map<MovieDTO, Movie>(model);
                actor.actorFilms.Add(obj);
                _logger.LogInformation($"Movie added to actor: id: {obj.Id} name: {obj.Name}");
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

        [HttpGet("{id}/movies")]
        public async Task<List<MovieDTO>> getActorFilms([FromRoute]int id)
        {
            var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == id);
            var entities = await actor.actorFilms.AsQueryable().ToListAsync();
            return _mapper.Map<List<Movie>, List<MovieDTO>>(entities);
        }
        
        [HttpDelete("delete/{id}")]
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

    }
}
