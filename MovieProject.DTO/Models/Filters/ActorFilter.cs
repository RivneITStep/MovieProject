using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.DTO.Models.Filters
{
    public class ActorFilter
    {
        public string Filter { get; set; }
        public List<string> Data { get; set; }
    }
}
