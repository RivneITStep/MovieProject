using AutoMapper;
using WebApplicationRiderTest.DTO.Actor;
using WebApplicationRiderTest.DTO.Movie;
using WebApplicationRiderTest.DTO.Photo;
using WebApplicationRiderTest.DTO.Review;
using WebApplicationRiderTest.DTO.User;
using WebApplicationRiderTest.DTO.Video;
using WebApplicationRiderTest.EF.Entities;

namespace WebApplicationRiderTest.MappingProfiles
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
            CreateMap<Video, VideoDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UserEditDTO>().ReverseMap();
        }
    }
}