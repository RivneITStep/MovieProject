using MovieProject.DesktopClientApp.Core.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MovieProject.DesktopClientApp.Core.Services
{
    public static class AuthService
    {
        private static HttpClient _client = new HttpClient();
        private static readonly string _baseUrl = "http://localhost:56682/api/account";

        public static async Task<ApiResult> LoginAsync(Login model)
        {
            var json = JsonConvert.SerializeObject(model);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _client.PostAsync(_baseUrl + "/login", data);
            var result = response.Content.ReadAsStringAsync().Result;
            var apiResult = JsonConvert.DeserializeObject<ApiResult>(result);
            return apiResult;
        }
    }
}
