﻿using AutoMapper;
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
    public class ArticleController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;
        public ArticleController(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<NewsArticleDTO>> getArticles()
        {
            var entities = await _context.articles.ToListAsync();
            return _mapper.Map<List<NewsArticle>, List<NewsArticleDTO>>(entities);
        }

        [HttpGet("{id}")]
        public async Task<NewsArticleDTO> getArticle([FromRoute]int id)
        {
            var obj = await _context.articles.SingleOrDefaultAsync(t => t.Id == id);
            return _mapper.Map<NewsArticle, NewsArticleDTO>(obj);
        }

        [HttpPost]
        public async Task<ResultDTO> addArticle([FromBody]NewsArticleDTO model)
        {
            try
            {
                var obj = _mapper.Map<NewsArticleDTO, NewsArticle>(model);
                await _context.articles.AddAsync(obj);
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
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = temp
                };
            }
            
        }

        [HttpDelete("{id}")]
        public async Task<ResultDTO> deleteArticle([FromRoute]int id)
        {
            var obj = await _context.articles.SingleOrDefaultAsync(t => t.Id == id);
            _context.articles.Remove(obj);
            await _context.SaveChangesAsync();
            return new ResultDTO
            {
                Status = 200,
                Message = "Deleted"
            };
        }
    }
}
