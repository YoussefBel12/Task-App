using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Task.Application.DTOs;

namespace Task.Application.Commands
{
    public class CreateAppTaskCommand : IRequest<int>
    {
        public AppTaskDto AppTaskDto { get; set; }

        public CreateAppTaskCommand(AppTaskDto appTaskDto)
        {
            AppTaskDto = appTaskDto;
        }
    }
}
