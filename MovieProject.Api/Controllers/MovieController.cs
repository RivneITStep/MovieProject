using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public class MovieController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;

        public MovieController(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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

        [HttpPost]
        public async Task<ResultDTO> addMovie([FromBody] MovieDTO model)
        {
            try
            {
                var obj = _mapper.Map<MovieDTO, Movie>(model);
                await _context.movies.AddAsync(obj);
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

        [HttpPost("{id}/add/actor")]
        public async Task<ResultDTO> addMovieActor([FromBody]ActorDTO model, [FromRoute]int id)
        {
            try
            {
                var movie = await _context.movies.SingleOrDefaultAsync(t => t.Id == id);
                var obj = _mapper.Map<ActorDTO, Actor>(model);
                movie.filmActors.Add(obj);
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

        [HttpGet("{id}/actors")]
        public async Task<List<ActorDTO>> getFilmActors([FromRoute]int id)
        {
            var movie = await _context.movies.SingleOrDefaultAsync(t => t.Id == id);
            var entities = await movie.filmActors.AsQueryable().ToListAsync();
            return _mapper.Map<List<Actor>, List<ActorDTO>>(entities);
        }


    }
}
