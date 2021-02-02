using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

using MovieProject.DesktopClientApp.Core.Models;
using Newtonsoft.Json;

namespace MovieProject.DesktopClientApp.Core.Services
{
    // This class holds sample data used by some generated pages to show how they can be used.
    // TODO WTS: Delete this file once your app is using real data.
    public static class MovieService
    {
        private static HttpClient _client = new HttpClient();
        private static readonly string _baseUrl = "http://localhost:56682/api/movie";

        public static async Task<IEnumerable<Movie>> GetMoviesAsync()
        {
            var response = await _client.GetStringAsync(_baseUrl);
            var movies = JsonConvert.DeserializeObject<List<Movie>>(response);
            return movies;
        }

        public static async Task<Movie> GetMovieAsync(int id)
        {
            var response = await _client.GetStringAsync(_baseUrl + '/' + id);
            var movie = JsonConvert.DeserializeObject<Movie>(response);
            return movie;
        }

        public static async Task<ApiResult> AddMovieAsync(Movie model)
        {
            var json = JsonConvert.SerializeObject(model);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _client.PostAsync(_baseUrl, data);
            var result = response.Content.ReadAsStringAsync().Result;
            var apiResult = JsonConvert.DeserializeObject<ApiResult>(result);
            return apiResult;
        }
    }
}
