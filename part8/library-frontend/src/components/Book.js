import { useQuery } from '@apollo/client'
import { BOOKS_ON_GENRE } from './Queries'

const Book = (props) => {
    const { loading, data } = useQuery(BOOKS_ON_GENRE, {
        variables: { genre: props.filter },
        fetchPolicy: "no-cache"
    })

    if (loading) return <div>loading...</div>

    const books = data.allBooks

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Book