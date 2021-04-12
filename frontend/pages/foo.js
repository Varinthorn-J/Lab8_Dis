import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const foo = ({ token }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        Foo_use()
    }, [])

    const Foo_use = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/foo`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }
 
    return (
        <Layout>
            <Head>
                <title>Foo</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                <h1>Foo</h1>
                {/* <div>
                    <b>Token:</b> {token.substring(0, 15)}... <br /><br />
                    This route is protected by token, user is required to login first.
                    <br/>
                    Otherwise, it will be redirect to Login page
                    <br/><br/>
                    {JSON.stringify(user)}
                </div> */}
            </div>
        </Layout>
    )
}

export default withAuth(foo)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
