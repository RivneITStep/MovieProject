using AutoMapper;
using MovieProject.DAL.Entities;
using MovieProject.DTO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MovieProject.DTO.Models.Actor;
using MovieProject.DTO.Models.Movie;
using MovieProject.DTO.Models.NewsArticle;
using MovieProject.DTO.Models.Review;

namespace MovieProject.Api.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Actor, ActorDTO>().ReverseMap();
            CreateMap<Actor, ActorAddDTO>().ReverseMap();
            CreateMap<Movie, MovieDTO>().ReverseMap();
            CreateMap<Movie, MovieAddDTO>().ReverseMap();
            CreateMap<Photo, PhotoDTO>().ReverseMap();
            CreateMap<Review, ReviewDTO>().ReverseMap();
            CreateMap<Review, ReviewAddDTO>().ReverseMap();
            CreateMap<NewsArticle, NewsArticleDTO>().ReverseMap();
            CreateMap<NewsArticle, NewsArticleAddDTO>().ReverseMap();
        }
    }
}
