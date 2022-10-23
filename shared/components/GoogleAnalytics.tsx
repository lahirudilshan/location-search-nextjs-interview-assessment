import Script from 'next/script'
import React from 'react'

const GoogleAnalytics = () => {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-FLCXV0Q4X2"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-FLCXV0Q4X2');
                `}
            </Script>
        </>
    )
}

export default GoogleAnalytics