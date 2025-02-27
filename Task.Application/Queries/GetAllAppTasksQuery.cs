﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Task.Application.DTOs;

namespace Task.Application.Queries
{
   public class GetAllAppTasksQuery : IRequest<List<AppTaskDto>>
    {
    }
}
