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
    public class PhotoController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<PhotoController> _logger;
        public PhotoController(EFContext context, IMapper mapper, ILogger<PhotoController> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost("actor")]
        public async Task<ResultDTO> addActorPhoto([FromBody]PhotoDTO model)
        {
            try
            {
                var actor = await _context.actors.SingleOrDefaultAsync(t => t.Id == model.ActorId);
                var photo = new Photo();
                photo.PictureUrl = model.PictureUrl;
                photo.Actor = actor;
                await _context.photos.AddAsync(photo);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Actor`s: id: {model.ActorId} photo successfuly added");
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
                _logger.LogInformation($"Actor`s: id: {model.ActorId} photo add failed. {ex.Message}");
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
