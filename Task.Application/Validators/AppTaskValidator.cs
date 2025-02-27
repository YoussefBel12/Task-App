using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Task.Application.DTOs;

namespace Task.Application.Validators
{
    public class AppTaskValidator : AbstractValidator<AppTaskDto>
    {
        public AppTaskValidator()
        {
            RuleFor(t => t.TaskName).NotEmpty().MaximumLength(100);
            RuleFor(t => t.TaskDescription).NotEmpty().MaximumLength(500);
            RuleFor(t => t.TaskStartDate).LessThan(t => t.TaskEndDate).WithMessage("Start date must be before end date.");
            RuleFor(t => t.TaskPriority).InclusiveBetween(1, 5);
        }
    }
}
