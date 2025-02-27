using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Task.Application.Interfaces;

namespace Task.Application.Commands
{
    public class DeleteAppTaskCommandHandler : IRequestHandler<DeleteAppTaskCommand, bool>
    {
        private readonly IAppTaskRepository _taskRepository;

        public DeleteAppTaskCommandHandler(IAppTaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<bool> Handle(DeleteAppTaskCommand request, CancellationToken cancellationToken)
        {
            return await _taskRepository.DeleteTaskAsync(request.AppTaskId);
        }
    }
}
