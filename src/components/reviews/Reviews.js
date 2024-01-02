import React, { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from "../../api/axiosConfig";
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {
  const reviewText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, [])

  const addReview = async (e) => {
    e.preventDefault();
    const review = reviewText.current;
    try {
      const response = await api.post('/api/v1/reviews', {reviewBody: review.value,imdbId:movieId});
      const updatedReviews = [...reviews,{body:review.value}];
      review.value = '';
      setReviews(updatedReviews);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Row>
        <Col><h3>Reviews</h3></Col>
      </Row>
      <Row className='mt-2'>
        <Col>
          <img src={movie?.poster} alt=''></img>
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm handleSubmit={addReview} reviewText={reviewText} labelText='Write a Review?'/>
                </Col>
              </Row>
              <Row>
                <Col>
                 <hr/>
                </Col>
              </Row>
            </>
          }
          {
            reviews?.map((r) => {
              return(
                <>
                  <Row>
                    <Col>
                      {r.body}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr/>
                    </Col>
                  </Row>
                </>
              )
            })
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Reviews