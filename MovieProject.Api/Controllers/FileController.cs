using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieProject.DAL;
using MovieProject.DAL.Entities;
using MovieProject.DTO.Models;
using MovieProject.DTO.Models.Result;

namespace MovieProject.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _environment;

        public FileController(EFContext context, IMapper mapper, IWebHostEnvironment environment)
        {
            _context = context;
            _mapper = mapper;
            _environment = environment;
        }

        [HttpPost]
        public async Task<ResultDTO> addFile(IFormFile uploadedFile)
        {
            if (uploadedFile != null)
            {
                string path = "/Files/" + uploadedFile.FileName;
                await using (var fileStream = new FileStream(_environment.WebRootPath + path, FileMode.Create))
                {
                    await uploadedFile.CopyToAsync(fileStream);
                }

                var file = new FileModel {Name = uploadedFile.FileName, Path = path};
                await _context.files.AddAsync(file);
                await _context.SaveChangesAsync();
                return new ResultDTO
                {
                    Status = 200,
                    Message = "Posted"
                };
            }

            return new ResultDTO
            {
                Status = 500,
                Message = "Error"
            };
        }
    }
}