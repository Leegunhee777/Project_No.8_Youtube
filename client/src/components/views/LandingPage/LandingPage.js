import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd'; //반응형으로 만들때 유용함
import axios from 'axios';
import moment from 'moment'; //날자출력 포맷을 정해주기 위해사용
const { Title } = Typography;
const { Meta } = Card;


function LandingPage({user}) {

    const [Videos, setVideos] = useState([])

    useEffect(() => {
       // console.log('user란');//app.js의 Auch함수에 의해 렌더되는 모든 컴포넌트에서 로그인정보에 대한 user(서버에서받아온 리덕스값과연동)값 쓸수있음
       // console.log(user);
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    },[] )





    const renderCards = Videos.map((video, index) => {
        return <Col  key= {index} lg={6} md={8} xs={48}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                    <video style={{width:'100%' ,height:'200px'}}src={`http://localhost:5000/${video.filePath}`} controls={false}/>
                </a>
            </div>
            <br />
            <Meta
                avatar={<Avatar src={video.writer.image} />}
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YYYY")} </span>
        </Col>

    }).reverse()



    return (
        <div style={{width: '80%', margin: '5rem auto'}}>
        <Title level={2} >Recommended</Title>
         <hr/>
         <Row gutter={16}>
           
           {renderCards}
         
         </Row>
    </div>
    )
}

export default LandingPage
