import argparse
import pysftp


ALEGRIA_PATH_FOLDER = "/home/storage/c/93/dd/concafras1/public_html"
HOST_PORT = 22


def find_and_replace_in_file(env_path):
  # Lendo arquivo
  with open('dist/alegria-portal/index.html', 'r') as file :
    filedata = file.read()

  # Reescrevendo o texto específico
  filedata = filedata.replace('/alegriacrista', env_path)

  # Escrevendo a saída
  with open('dist/alegria-portal/index.html', 'w') as file:
    file.write(filedata)


def main(params):
  # Configurações necessárias para não verificar as chaves SSH's
  cnopts = pysftp.CnOpts()
  cnopts.hostkeys = None
  env_path = "/alegriacrista/" if params['env'] == 'prd' else "/alegriacrista-dev/"

  # Reescrevendo a base da conexão
  find_and_replace_in_file(env_path)

  # Início da conexão com o servidor da CONCAFRAS
  with pysftp.Connection(host=params['host'], username=params['user'], password=params['pass'], port=HOST_PORT, cnopts=cnopts, log="./log_script.log") as sftp:
    absolute_path = f"{ALEGRIA_PATH_FOLDER}{env_path}"
    with sftp.cd(absolute_path):
      print(f"Entrou dentro do {absolute_path}")
      sftp.put_r("dist/alegria-portal/", absolute_path)
    sftp.close()


if __name__ == "__main__":
  parser = argparse.ArgumentParser(description='Parametros para execução do dataflow stream')
  parser.add_argument('host', help='Host para realizar a conexão.')
  parser.add_argument('user', help='Usuário para realizar a conexão.')
  parser.add_argument('pass', help='Senha para realizar a conexão.')
  parser.add_argument('env', help='Ambiente do deploy.')
  params = vars(parser.parse_args())

  main(params)
