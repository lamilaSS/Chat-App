const primaryFont = 'arial';
const primaryColorText = '#FFFFFF';
const buttonColorBackground = '#4bc970';
const buttonColorBackgroundHover = '#81d99a';
const errorColor = '#eb1313';

export const styles = {
    login: {
        display: 'flex',
        width: '350px',
        flexDirection: 'column',
        margin: 'auto',
        color: primaryColorText,
        fontFamily: primaryFont,


        border: '1px solid #4bc970',
        padding: '40px 40px',
        boxSizing: 'border-box',
        background: 'rgba(0, 0, 0, .8)',

        '& h2': {
            margin: '0',
            padding: '0px 0px 20px 0px',
            color: '#4bc970',
            textAlign: 'center',
        },

        '& p': {
            margin: 0,
            fontWeight: 'bold',
        },

        '& p.error': {
            fontSize: '12px',
            fontWeight: 'normal',
            color: errorColor,
        },

        '& input': {
            width: '100%',
            marginBottom: '20px',
            border: 'none',
            borderBottom: '1px solid #FFFFFF',
            background: 'transparent',
            outline: 'none',
            color: primaryColorText,
            fontSize: '16px',
            height: '40px',
        },

        '& .action': {
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-around',

            '& button': {
                outline: 'none',
                border: 'none',
                padding: '5px 15px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '16px',

                '&:hover': {
                    backgroundColor: buttonColorBackgroundHover,
                }
            },

            '& .btnSignup': {
                backgroundColor: buttonColorBackground,
            },

            '& .btnLogin': {
                backgroundColor: buttonColorBackground,
            }
        }
    },
}