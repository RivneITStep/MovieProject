﻿using System;
using System.Collections.Generic;
using System.Text;

namespace MovieProject.DesktopClientApp.Core.Models
{
    public class ApiResult
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public List<string> Errors { get; set; }
    }
}
