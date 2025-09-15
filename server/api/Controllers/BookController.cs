using dataaccess;
using Microsoft.AspNetCore.Mvc;
using services.Abstractions;

namespace api.Controllers;

[ApiController]
public class BookController(IService<BaseBookRequest, BaseBookResponse> bookService) : ControllerBase
{
    [HttpGet(nameof(GetBooks))]
    public List<Book> GetBooks()
    {
        throw new NotImplementedException();
    }
    
    [HttpGet(nameof(GetBook))]
    public Book GetBook(string id)
    {
        throw new NotImplementedException();
    }
    
    [HttpPost(nameof(CreateBook))]
    public Book CreateBook([FromBody] CreateBookDto dto)
    {
        throw new NotImplementedException();
    }
    
    [HttpPut(nameof(CreateBook))]
    public Book UpdateBook([FromBody] UpdateBookDto dto)
    {
        throw new NotImplementedException();
    }
}