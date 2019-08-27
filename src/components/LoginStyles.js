const primaryFont = 'arial';
const primaryColorText = '#010000';
const buttonColorBackground = '#4bc970';
const buttonColorBackgroundHover = '#81d99a';
const errorColor = '#eb1313';

export const styles = {
    login: {
        display: 'flex',
        width: '100%',
        height: '390px',
        flexDirection: 'column',
        margin: 'auto',
        color: primaryColorText,
        fontFamily: primaryFont,
        boxSizing: 'border-box',
        padding: '10px 30px ',
        justifyContent: 'center',

        '& h2': {
            margin: '0',
            paddingBottom: '35px',
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
            marginBottom: '30px',
            border: 'none',
            borderBottom: '1px solid #010000',
            background: 'transparent',
            outline: 'none',
            color: primaryColorText,
            fontSize: '14px',
            height: '30px',
        },

        '& .action': {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '15px',

            '& button': {
                outline: 'none',
                border: 'none',
                padding: '5px 15px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '14px',

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
        },
        '&.close': {
            display: 'inline-block',
        }
    },
}