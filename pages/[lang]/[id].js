import { useRouter } from 'next/router';
import { getPagesURLs, getPageByURL } from '../../lib/db';
import { ContentPage } from '../../src/ContentPage';

// localized second level page
export default function Page(props) {
    const router = useRouter();
    const { lang } = router.query;
    return <ContentPage lang={lang} {...props} />;
}

export async function getServerSideProps(context) {
    const content = await getPageByURL(context.params.lang, context.params.id);

    if (!content) {
        // redirect to locale's index if localized page is not found
        context.res.setHeader('location', `/${context.params.lang}`);
        context.res.statusCode = 302;
        context.res.end();
    }

    return {
        props: {
            pages: await getPagesURLs(context.params.lang),
            content
        }
    };
}
