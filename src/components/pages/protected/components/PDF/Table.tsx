import { Text, View, StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
    title: {
        padding: '5px',
        marginBottom: '5px',
        fontSize: '18px'
    },
    table: {

    },
    row: {
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        borderBottom: '1px solid black',
    },
    cell: {
        padding: '5px',
        width: '80px',
        // minWidth: '30px',
        // maxWidth: '80px',
        alignItems:'center',
    },
    text:{
        margin: '0px',
        padding: '0px',
        wordBreak: 'keep-all',
        textAlign:'center',
    }
});


interface RowProps {
    cols: Array<(number | string)>
}

function Row({
    cols
}: RowProps) {
    return (
        <View style={styles.row}>
            {
                cols.map((col, id) => <Cell key={id} val={col} />)
            }
        </View>
    )
}


interface CellProps {
    val: string | number
}

function Cell(props: CellProps) {
    return (
        <View style={styles.cell}>
            <Text style={styles.text}>{props.val}</Text>
        </View>
    )
}



export interface TableProps {
    title: string,
    rows: (number | string)[][]
}

export default function Table({
    rows,
    title
}: TableProps) {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            {rows.map((row, id) => <Row key={id} cols={row} />)}
        </View>
    )
}
