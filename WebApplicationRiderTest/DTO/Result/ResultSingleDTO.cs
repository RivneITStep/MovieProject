namespace WebApplicationRiderTest.DTO.Result
{
    public class ResultSingleDTO<T> : ResultDTO
    {
        public T data { get; set; }
    }
}