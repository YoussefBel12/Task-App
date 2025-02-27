using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Task.Application.DTOs;
using Task.Domain.Entities;

namespace Task.Application.Mappings
{
    public class AppTaskProfile : Profile
    {
        public AppTaskProfile()
        {
            CreateMap<AppTask, AppTaskDto>().ReverseMap();
        }
    }
}
