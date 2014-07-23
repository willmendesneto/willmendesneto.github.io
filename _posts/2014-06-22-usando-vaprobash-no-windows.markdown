---
layout: post
title: Usando Vaprobash no Windows
categories:
- vagrant
- tools
tags:
- bash script
- windows
- workflow
- provisionment
status: publish
type: post
published: true
meta: {}
author:
---
Usando Vaprobash no Windows

Dica simples para quem está gostando de provisionar. Sempre buscamos algo que facilite nossas tarefas. Por mais que elas sejam mais simples, cada segundo conta e tarefas repetitivas são desgastantes. Há algum tempo conheci o projeto [Vaprobash][vaprobash] do Chris Fidao (@fideveloper), que simplifica a criação de boxes vagrant das mais diferentes formas por comandos via Bash Scripts. Atualmente o Vaprobash pode criar para a [Puppet][puppet], [Cheff][cheff] e [Ansible][ansible].

Atualmente estou utilizando uma máquina Windows, então provisionar é mais que uma necessidade (rsrsrs) e achei neste momento uma oportunidade de testar o projeto. E realmente a sua utilização é bastante simples.

Inicialmente precisamos instalar o Vagrant (neste post assumo que você já conheça o [Vagrant][vagrant]. Caso não conheça por favor [saiba mais sobre o assunto no site oficial do projeto Vagrant][vagrant]) em sua versão mais atual. Caso sua máquina já tenha o vagrant, atualize para a versão mais atual. Após isso, no caso de usuários Windows, instale o plugin [Vagrant WinNFSd (https://github.com/GM-Alex/vagrant-winnfsd)][vagrant-winnfsd] para dar suporte a NFS no Windows baseando-se nos mesmos comportamentos do vagrant de trabalhar com NFS. Apesar da própria documentação do Vagrant conter o seguinte:

> "Windows users: NFS folders do not work on Windows hosts. Vagrant will
> ignore your request for NFS synced folders on Windows."
>
> > referência: [http://docs.vagrantup.com/v2/synced-folders/nfs.html][vagrant-nfs]

Agora vamos realmente iniciar o provisionamento com o [Vaprobash][vaprobash]. Para maiores informações dêem uma olhada no [github do projeto (https://github.com/fideloper/Vaprobash)][vaprobash-gh] ou em uma [lista de Vídeos no Vimeo criadas pelo próprio Chris Fidao (@fideveloper) http://vimeo.com/fideloper][vaprobash-gh].


* Caso tenham interesse em dar uma olhada em alguns dos links que comentei neste post, segue a lista de links citados nesta postagem.

Links:

Obrigado e até a próxima.

Links:

* Vagrant: [http://www.vagrantup.com/][vagrant]
* Documentação [Vagrant: http://docs.vagrantup.com/v2/][vagrant-docs]
* Vagrant WinNfsd: [https://github.com/GM-Alex/vagrant-winnfsd][vagrant-winnfsd]
* Vaprobash: [http://fideloper.github.io/Vaprobash/index.html][vaprobash]
* Vimeo Crhris Fidao (fideveloper): [http://vimeo.com/fideloper][fideveloper-vimeo]
* Puppet: [https://github.com/puppetlabs/puppet][puppet]
* Chef: [https://github.com/opscode/chef][cheff]
* Ansible: [https://github.com/ansible/ansible][ansible]


[vagrant]: http://www.vagrantup.com/
[vagrant-docs]: http://docs.vagrantup.com/v2/
[vagrant-winnfsd]: https://github.com/GM-Alex/vagrant-winnfsd
[vaprobash]: http://fideloper.github.io/Vaprobash/index.html
[vaprobash-gh]: https://github.com/fideloper/Vaprobash
[fideveloper-vimeo]: http://vimeo.com/fideloper
[puppet]: https://github.com/puppetlabs/puppet
[cheff]: https://github.com/opscode/chef
[ansible]: https://github.com/ansible/ansible
[vagrant-nfs]: http://docs.vagrantup.com/v2/synced-folders/nfs.html

