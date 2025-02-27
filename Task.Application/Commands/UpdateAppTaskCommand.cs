using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Task.Application.DTOs;

namespace Task.Application.Commands
{
    public class UpdateAppTaskCommand : IRequest<bool>
    {
        public AppTaskDto AppTaskDto { get; set; }

        public UpdateAppTaskCommand(AppTaskDto appTaskDto)
        {
            AppTaskDto = appTaskDto;
        }
    }
}
