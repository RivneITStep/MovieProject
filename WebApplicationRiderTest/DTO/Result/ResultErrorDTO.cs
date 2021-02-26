using System.Collections.Generic;

namespace WebApplicationRiderTest.DTO.Result
{
    public class ResultErrorDTO : ResultDTO
    {
        public List<string> Errors { get; set; }
    }
}