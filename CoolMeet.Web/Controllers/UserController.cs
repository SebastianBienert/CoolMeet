﻿using System;
using System.Threading.Tasks;
using CoolMeet.BL.Interfaces;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Dtos.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoolMeet.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : BaseController
    {
        private readonly IUserService _serviceUser;

        private readonly IEventService _eventService;

        public UserController(IUserService serviceUser, IEventService eventService)
        {
            _serviceUser = serviceUser;
            _eventService = eventService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _serviceUser.GetAllUsers();
            if (users != null)
                return Ok(users);

            return NotFound();
        }

        [HttpGet("{id}", Name = "GetUserById")]
        //[Authorize]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _serviceUser.GetUser(id);
            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();
        }

        [HttpGet("{id}/photo", Name = "GetUserPhotoById")]
        public async Task<IActionResult> GetUserPhoto(string id)
        {
            var image = await _serviceUser.GetUserPhoto(id);
            if (image == null)
            {
                return NotFound();
            }
            return File(image, "image/jpeg");
            
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (await _serviceUser.DeleteUser(id))
            {
                return Ok();
            }
            return NotFound();
        }

        [HttpGet("{id}/events")]
        public async Task<IActionResult> GetUserEvents(string id)
        {
            var events = await _eventService.GetUserEvents(id);

            if (events != null)
                return Ok(events);

            return NotFound();
        }


    }
}