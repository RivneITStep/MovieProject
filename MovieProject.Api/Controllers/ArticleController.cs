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
    /// <summary>
    /// Article Controller is responsible for NewsArticle`s CRUD
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;
        public ArticleController(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
    }
}
