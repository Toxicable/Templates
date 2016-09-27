﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthApi.Data.Tables
{
    public class ApiClientEntity
    {
        public string Id { get; set; }
        [Required]
        public string Secrect { get; set; }
        [Required]
        public string Name { get; set; }
        public ApplicationType Type { get; set; }
        public bool Active { get; set; }
        public int RefreshTokenLifeTime { get; set; }
        public string AllowedOrigin { get; set; }

        public ICollection<RefreshTokenEntity> RefreshTokens { get; set; }
    }

    public enum ApplicationType
    {
        JavaScript,
        Native
    }
}
