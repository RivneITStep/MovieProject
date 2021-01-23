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
    /// <summary>
    /// Review Controller is responsible for Review`s CRUD
    /// </summary>
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
        
        //CRUD
        /// <summary>
        /// This POST method adds Review`s model to database
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ResultDTO> AddReview([FromBody] ReviewDTO model)
        {
            try
            {
                var review = _mapper.Map<ReviewDTO, Review>(model);
                await _context.reviews.AddAsync(review);
                await _context.SaveChangesAsync();
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
        /// This GET method returns Review`s model by it`s ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ReviewDTO> GetReview([FromRoute] int id)
        {
            var review = await _context.reviews.SingleOrDefaultAsync(t => t.Id == id);
            return _mapper.Map<Review, ReviewDTO>(review);
        }
    
        /// <summary>
        /// This GET method returns all Review models from database
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<ReviewDTO>> GetReviews()
        {
            var reviews = await _context.reviews.ToListAsync();
            return _mapper.Map<List<Review>,List<ReviewDTO>>(reviews);
        }
        
        /// <summary>
        /// This POST method edits Review model by it`s ID
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("edit")]
        public async Task<ResultDTO> EditReview([FromBody] ReviewDTO model)
        {
            var review = await _context.reviews.SingleOrDefaultAsync(t => t.Id == model.Id);
            _mapper.Map(model,review);
            return new ResultDTO
            {
                Status = 200,
                Message = "Posted"
            };
        }
        
        /// <summary>
        /// This DELETE method deletes Review model from database by it`s ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ResultDTO> DeleteReview([FromRoute] int id)
        {
            var review = await _context.reviews.SingleOrDefaultAsync(t => t.Id == id);
            _context.reviews.Remove(review);
            await _context.SaveChangesAsync();
            return new ResultDTO
            {
                Status = 200,
                Message = "Deleted"
            };
        }
    }
}
