import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAccess } from "../../AccessContext";
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import User from '../../../../../../models/User';
import useNotification from '../../../../../../contexts/NotificationContext/useNotification';
import UserService from '../../../../../../services/UserService';
import LinkIcon from '@mui/icons-material/Link';
import { dynamicPaths } from '../../../../../../shared/path';
import TabHeadLine from '../../../../../../shared/components/TabHeadLine';
import { Link } from '@mui/material';


function usersNotUsers(a: readonly User[], b: readonly User[]) {
    return a.filter(ai => (b.find(bi => bi.id === ai.id) === undefined));
}

function notNumNum(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}


function intersection(a: readonly number[], b: readonly User[]) {
    return a.filter((value) => b.find(({ id }) => id === value));
}


export default function EditUsersAccess() {
    const { accessesList } = useAccess();
    const notify = useNotification();

    const [checked, setChecked] = React.useState<readonly number[]>([]);

    const [leftUsers, setLeftUsers] = React.useState<User[]>([]);
    const [rightUsers, setRightUsers] = React.useState<User[]>([]);

    const [access, setAccess] = React.useState<{
        [index: string]: number,
        right: number,
        left: number
    }>({ left: accessesList[0]?.id, right: accessesList[1]?.id });


    const updateUsersAccess = React.useCallback(async (users: User[], accessId: number) => {
        const calls = users.map(async (user) => {
            try {
                await UserService.updateAccess(user.id, accessId);
                return user;
            } catch (err: any) {
                notify(err.description, 'error');
                return false;
            }
        });
        let results = await Promise.all(calls);
        return results.filter(item => item !== false) as User[];
    }, [notify]);


    const loadUsers = React.useCallback(async (accessId: number) => {
        try {
            const resp = await UserService.getUsers({ accessId: accessId, deleted: false });
            return resp.data as User[];
        } catch (err: any) {
            notify(err.description, 'error');
        }
        return [];
    }, [notify]);


    React.useEffect(() => {
        loadUsers(access.left).then(data => setLeftUsers(data))
    }, [
        access.left,
        loadUsers,
    ]);


    React.useEffect(() => {
        loadUsers(access.right).then(data => setRightUsers(data))
    }, [
        access.right,
        loadUsers,
    ]);



    const leftChecked = React.useMemo(() => intersection(checked, leftUsers), [checked, leftUsers]);
    const rightChecked = React.useMemo(() => intersection(checked, rightUsers), [checked, rightUsers]);


    const handleToggle = React.useCallback((value: number) => () => {
        setChecked(old => {
            const currentIndex = old.indexOf(value);
            const checked = Object.assign([], old) as number[];

            if (currentIndex === -1) {
                checked.push(value);
            } else {
                checked.splice(currentIndex, 1);
            }
            return checked
        });
    }, []);


    // to the right
    const handleCheckedRight = React.useCallback(async () => {
        const usersToMove = leftUsers.filter(({ id }) => leftChecked.indexOf(id) !== -1);

        const moved = await updateUsersAccess(usersToMove, access.right);
        setRightUsers(rightUsers.concat(moved));

        setLeftUsers(usersNotUsers(leftUsers, moved)); //not user who is selected
        setChecked(notNumNum(checked, leftChecked)); // uncheck checked elements
    }, [
        leftChecked,
        rightUsers,
        leftUsers,
        checked,
        access.right,
        updateUsersAccess,
    ]);


    // to the left
    const handleCheckedLeft = React.useCallback(async () => {
        const usersToMove = rightUsers.filter(({ id }) => rightChecked.indexOf(id) !== -1);

        const moved = await updateUsersAccess(usersToMove, access.left);
        setLeftUsers(leftUsers.concat(moved));

        let l = usersNotUsers(rightUsers, moved);
        console.log(l);
        setRightUsers(l); //not user who is selected
        setChecked(notNumNum(checked, rightChecked)); // uncheck checked elements

    }, [
        rightChecked,
        leftUsers,
        rightUsers,
        checked,
        access.left,
        updateUsersAccess,
    ]);


    const handleSelectChange = React.useCallback((event: SelectChangeEvent<number>): void => {
        const value = Number(event.target.value);

        setAccess(old => {
            if (old.left === value || old.right === value) return old;

            return {
                ...old,
                [event.target.name]: Number(event.target.value)
            }
        });
    }, []);


    const customList = React.useCallback((direction: string, users: readonly User[]) => (
        <Card>
            <Box sx={{ p: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="wybierz-klase-dostępu">Klasa dostępu</InputLabel>
                    <Select
                        labelId="wybierz-klase-dostępu"
                        name={direction}
                        value={access[direction]}
                        label="klasa dostępu"
                        onChange={handleSelectChange}
                    >
                        {accessesList.map(({ name, id }) => <MenuItem key={name} value={id} >{name} </MenuItem>)}
                    </Select>
                </FormControl>
            </Box>

            <Divider />
            <List
                sx={{
                    // maxWidth: 400,
                    // width: '30vw',
                    height: 550,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {users.map((user: User) => {
                    const labelId = `transfer-list-all-item-${user.id}-label`;

                    return (
                        <ListItem
                            key={user.id}
                            role="listitem"
                            button
                            onClick={handleToggle(user.id)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(user.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={user.email} />

                            <ListItemIcon onClick={(ev: any) => ev.stopPropagation()} color='primary'>
                                <Link href={dynamicPaths.toUser(user.id)}>
                                    <LinkIcon />
                                </Link>
                            </ListItemIcon>
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    ), [handleToggle, checked, handleSelectChange, access, accessesList]);

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <TabHeadLine
                    title='Administracja klasami dostępu'
                    subtitle='Wybierz stworzone klasy dostępu i przemieszczaj użytkowników pomiędzy kolumnami, przypisując im wybraną role.'
                />
            </Grid>

            <Grid item xs={12} sm={5}>{customList('left', leftUsers)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={5}>{customList('right', rightUsers)}</Grid>
        </Grid>
    );
}
