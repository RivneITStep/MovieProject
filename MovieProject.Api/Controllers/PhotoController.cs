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
    public class PhotoController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;
        public PhotoController(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("actor/{id}")]
        public async Task<ResultDTO> addActorPhoto([FromBody]PhotoDTO model)
        {
            try
            {
                var obj = _mapper.Map<PhotoDTO, Photo>(model);
                await _context.photos.AddAsync(obj);
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

        [HttpGet("actor/{id}")]
        public async Task<IEnumerable<PhotoDTO>> getActorPhotos([FromRoute]int id)
        {
            var entities = await _context.photos.Where(t => t.ActorId == id).ToListAsync();
            return _mapper.Map<List<Photo>, List<PhotoDTO>>(entities);
        }


    }
}
