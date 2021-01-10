using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieProject.DAL;
using MovieProject.DAL.Entities;
using MovieProject.DTO.Models;
using MovieProject.DTO.Models.Result;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;

        public ReviewController(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ResultDTO> addReview([FromBody] ReviewDTO model)
        {
            try {

                var obj = _mapper.Map<ReviewDTO, Review>(model);
                await _context.reviews.AddAsync(obj);
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

        [HttpGet("{id}")]
        public IEnumerable<ReviewDTO> getMovieReviews([FromRoute]int id)
        {
            var entities = _context.reviews.Where(t => t.MovieId == id).ToList();
            return _mapper.Map<List<Review>, List<ReviewDTO>>(entities);
        }

    }
}
