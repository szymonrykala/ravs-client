import { Page, Font, View, Document, StyleSheet, Text } from '@react-pdf/renderer';


// Register Font
Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});


const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        fontFamily: "Roboto",
        flexDirection: 'column',
        backgroundColor: '#ffffff'
    },
    section: {
        marginBottom: '15px',
        justifyContent: 'flex-start',
        padding: '15px',
    },
    head: {
        fontSize: '16px'
    }
});


interface PDFPageProps {
    sections: React.ReactNode[],
    subject: string
};


export default function PDFPage(props: PDFPageProps) {
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>
                <View style={styles.section}>
                    <Text style={styles.head}>
                        Rav System, dnia {(new Date()).toLocaleString('pl')}
                    </Text>
                    <Text style={styles.head}>
                        {props.subject}
                    </Text>
                </View>
                {
                    props.sections.map((node, id) =>
                        <View
                            key={id}
                            style={styles.section}
                        >
                            {node}
                        </View>
                    )
                }
            </Page>
        </Document>
    )
}