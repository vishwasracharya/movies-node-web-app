/* Models */
const Movies = require('../models/movies');

/* POST Methods */
const addMovies = async (req, res) => {
    try {
        const data = req.body;
        const movie = new Movies(data);
        await movie.save();
        res.redirect(200, process.env.SITE_URL);
    } catch (error) {
        console.log(error);
    }
};

const editMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const newdata = {
            title: data.title,
            genre: data.genre,
            director: data.director,
            year: data.year,
            rating: data.rating,
            image: data.image,
            description: data.description,
            updated_at: Date.now()
        };
        await Movies.findByIdAndUpdate(id, newdata);
        res.redirect(200, `${process.env.SITE_URL}/movies/${id}`);
    } catch (error) {
        console.log(error);
    }
}

/* DELETE Methods */
const deleteMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        await Movies.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: "Movie Deleted Successfully"
        });
    } catch (error) {
        console.log(error);
    }
};

/* GET Methods */
const getAllMovies = async (req, res) => {
    try {
        let movies = await Movies.find();
        movies = movies.map(movie => {
            return {
                _id: movie._id,
                title: movie.title,
                genre: movie.genre,
                director: movie.director,
                year: movie.year,
                rating: movie.rating,
                image: movie.image,
                description: movie.description,
                created_at: movie.created_at,
                updated_at: movie.updated_at
            }
        });
        return movies;
    } catch (error) {
        console.log(error);
    }
}

const getMovieById = async (id) => {
    try {
        let movie = await Movies.findById(id);
        if (movie) {
            return movie;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.addMovies = addMovies;
module.exports.getAllMovies = getAllMovies;
module.exports.getMovieById = getMovieById;
module.exports.editMovieById = editMovieById;
module.exports.deleteMovieById = deleteMovieById;