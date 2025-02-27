using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Task.Application.Interfaces;
using Task.Application.Validators;

namespace Task.Application.Commands
{
    public class UpdateAppTaskCommandHandler : IRequestHandler<UpdateAppTaskCommand, bool>
    {
        private readonly IAppTaskRepository _taskRepository;
        private readonly AppTaskValidator _taskValidator;
        public UpdateAppTaskCommandHandler(IAppTaskRepository taskRepository, AppTaskValidator taskValidator)
        {
            _taskRepository = taskRepository;
            _taskValidator = taskValidator;
        }

        public async Task<bool> Handle(UpdateAppTaskCommand request, CancellationToken cancellationToken)
        {
            // Validate the AppTaskDto
            ValidationResult validationResult = await _taskValidator.ValidateAsync(request.AppTaskDto, cancellationToken);

            if (!validationResult.IsValid)
            {
                // Validation failed, throw a ValidationException with errors
                throw new ValidationException(validationResult.Errors);
            }


            // If valid, proceed to update the task
            return await _taskRepository.UpdateTaskAsync(request.AppTaskDto);
        }
    }
}
