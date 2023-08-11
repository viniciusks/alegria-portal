import argparse
import pysftp

def main(params):
    print(params)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Parametros para execução do dataflow stream')
    parser.add_argument('host', help='Host para realizar a conexão.')
    parser.add_argument('user', help='Usuário para realizar a conexão.')
    parser.add_argument('pass', help='Senha para realizar a conexão.')
    parser.add_argument('file_path', help='Arquivo que deve ser transferido.')
    params = vars(parser.parse_args())

    main(params)
