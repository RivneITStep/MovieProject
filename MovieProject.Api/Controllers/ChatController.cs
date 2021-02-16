using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MovieProject.Api.Hubs;
using MovieProject.DTO.Models.Requests;

namespace MovieProject.Api.Controllers
{
    [Route("api/chat")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }
        
        [Route("send")]                                           //path looks like this: https://localhost:44379/api/chat/send
        [HttpPost]
        public IActionResult SendRequest([FromBody] MessageDTO msg)
        {
            _hubContext.Clients.All.SendAsync("ReceiveOne", msg.user, msg.message);
            return Ok();
        }
    }
}