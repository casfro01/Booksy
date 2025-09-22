using dataaccess;
using Microsoft.AspNetCore.Mvc;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace api.Controllers;

[ApiController]
public class BookController(IService<BaseBookResponse, CreateBookDto, UpdateBookDto> bookService) : ControllerBase
{
    [HttpGet(nameof(GetBooks))]
    public async Task<List<BaseBookResponse>> GetBooks()
    {
        return await bookService.Get();
    }
    
    [HttpGet(nameof(GetBook))]
    public async Task<BaseBookResponse> GetBook(string id)
    {
        return await bookService.Get(id);
    }
    
    [HttpPost(nameof(CreateBook))]
    public async Task<BaseBookResponse> CreateBook([FromBody] CreateBookDto dto)
    {
        return await bookService.Create(dto);
    }
    
    [HttpPut(nameof(UpdateBook))]
    public Book UpdateBook([FromBody] UpdateBookDto dto)
    {
        throw new NotImplementedException();
    }
    
    [HttpDelete(nameof(DeleteBook))]
    public Book DeleteBook([FromBody] string id)
    {
        throw new NotImplementedException();
    }
}