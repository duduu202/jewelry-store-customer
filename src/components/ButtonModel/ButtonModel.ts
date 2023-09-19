import styled from 'styled-components'

export const ButtonModel = styled.button`
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.dark_font};
    cursor: pointer;
    font-size: 1rem;
    font-weight: 1rem;;
    padding: 0.5rem 1rem;

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`
