using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace Task.Application.Commands
{
    public class DeleteAppTaskCommand : IRequest<bool>
    {
        public int AppTaskId { get; set; }

        public DeleteAppTaskCommand(int appTaskId)
        {
            AppTaskId = appTaskId;
        }
    }
}
