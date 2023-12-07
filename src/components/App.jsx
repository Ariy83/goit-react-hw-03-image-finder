import React from "react"
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { fetchImagesByQuery } from "services/api";

export class App extends React.Component {
  state = {
    images: [],
    q: '',
    page: 1,
    per_page: 12,
    totalHits: null,
    loading: false,
		error: null,
  }

  async componentDidMount() {
		try {
			this.setState({ loading: true, error: null })
			// Робимо запит, отримуємо пости
			const { hits, totalHits } = await fetchImagesByQuery()
			// Записуємо пости в стейт
			this.setState({ images: hits, totalHits })
		} catch (error) {
			console.log(error.message)
			this.setState({ error: error.message })
		} finally {
			this.setState({ loading: false })
		}
  }
  
async componentDidUpdate(_, prevState) {
		if (!this.state.q && prevState.page !== this.state.page) {
			try {
				this.setState({ loading: true, error: null })
				// Робимо запит, отримуємо пости
				const { hits, totalHits } = await fetchImagesByQuery({ page: this.state.page })
				// Записуємо пости в стейт
				this.setState(prevState => ({ images: [...prevState.images, ...hits], totalHits }))
			} catch (error) {
				console.log(error.message)
			} finally {
				this.setState({ loading: false })
			}
		}

		if (
			(this.state.q && prevState.q !== this.state.q) ||
			(this.state.q && prevState.page !== this.state.page)
		) {
			try {
				this.setState({ loading: true, error: null })

				// Робимо запит, отримуємо пости
				const { hits, totalHits  } = await fetchImagesByQuery({ page: this.state.page, q: this.state.q })
				// Записуємо пости в стейт
				this.setState(prevState => ({ images: [...prevState.images, ...hits], totalHits }))
			} catch (error) {
				console.log(error.message)
			} finally {
				this.setState({ loading: false })
			}
		}
	}

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
    console.log(this.state.page);
	}

	handleSetSearchQuery = text => {
		this.setState({ q: text, images: [], page: 1 })
  }
   
  handleSubmit = e => {
		e.preventDefault()
		console.log(this.state)
		console.log(e.target.input.value)
		this.setState({ q: e.target.input.value })
	}

  
  render() {

    const {images} = this.state
    
  return (
    <div className="App">

      <Searchbar onSubmit={this.handleSubmit}/>

      <ImageGallery images={images} />
      
      <Loader />

      <Button onClick={this.handleLoadMore}/>

      <Modal images={images} />
      
    </div>
  )}
};